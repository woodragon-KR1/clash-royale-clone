# 버그 수정 리포트

## 🐛 발견된 버그

사용자가 카드를 클릭한 후 필드를 클릭해도 유닛이 스폰되지 않고 엘릭서가 소비되지 않는 문제가 발견되었습니다.

## 🔍 원인 분석

### 주요 원인: 데이터 타입 불일치

**문제:**
- HTML의 `data-unit` 속성: 소문자 문자열 (`"knight"`, `"archer"`, `"giant"`)
- TypeScript enum: 대문자 (`UnitType.KNIGHT`, `UnitType.ARCHER`, `UnitType.GIANT`)

**영향:**
```typescript
// 문제가 있던 코드 (main.ts)
const unitType = card.getAttribute('data-unit') as UnitType;
// "knight" 문자열이 UnitType enum으로 타입 캐스팅되지만
// 실제 값은 "knight"이므로 enum 값 "KNIGHT"와 일치하지 않음
```

이로 인해:
1. 카드 선택이 제대로 작동하지 않음
2. `selectedCard` 변수에 잘못된 값이 저장됨
3. 스폰 시도 시 조건 검사 실패

## ✅ 수정 사항

### 1. main.ts - 카드 선택 로직 수정

**변경 전:**
```typescript
const unitType = card.getAttribute('data-unit') as UnitType;
game?.selectCard(unitType);
```

**변경 후:**
```typescript
const unitTypeStr = card.getAttribute('data-unit');

// Convert string to UnitType enum
let unitType: UnitType;
switch (unitTypeStr?.toLowerCase()) {
    case 'knight':
        unitType = UnitType.KNIGHT;
        break;
    case 'archer':
        unitType = UnitType.ARCHER;
        break;
    case 'giant':
        unitType = UnitType.GIANT;
        break;
    default:
        console.error('Unknown unit type:', unitTypeStr);
        return;
}

console.log('Card selected:', unitType);
game?.selectCard(unitType);
```

### 2. Game.ts - 디버그 로깅 추가

스폰 프로세스의 각 단계를 추적할 수 있도록 콘솔 로그 추가:

```typescript
handleCanvasClick(x: number, y: number): void {
    console.log('Canvas clicked at:', x, y, 'Selected card:', this.selectedCard);
    
    if (!this.selectedCard) {
        console.log('No card selected');
        return;
    }

    // ... 좌표 변환 ...
    
    console.log('Canvas coordinates:', canvasX, canvasY, 'Canvas height:', this.height);

    // 플레이어 영역 체크
    if (canvasY < this.height * 0.5) {
        console.log('Spawn blocked: not in player half');
        return;
    }

    console.log('Spawn attempt - Cost:', cost, 'Available elixir:', this.playerElixir);
    
    if (this.playerElixir >= cost) {
        console.log('Spawning unit:', this.selectedCard, 'at', canvasX, canvasY);
        this.spawnUnit(canvasX, canvasY, Team.PLAYER, this.selectedCard);
        // ...
    } else {
        console.log('Not enough elixir');
    }
}
```

## ✅ 검증된 기능

### 전투 시스템 (정상 작동 확인)

Unit.ts와 Tower.ts의 전투 로직 검토 결과, 모든 기능이 올바르게 구현되어 있음:

1. **타겟팅 시스템**
   - `findNearestEnemy()`: 가장 가까운 적 탐색
   - Giant 유닛은 타워 우선 공격

2. **이동 시스템**
   - `moveTowards()`: 타겟을 향해 이동
   - deltaTime 기반으로 프레임 독립적 움직임

3. **공격 시스템**
   - 공격 범위 체크
   - 공격 속도에 따른 공격 간격
   - `takeDamage()`: 데미지 적용 및 사망 처리

4. **AI 시스템**
   - 3초마다 적 유닛 스폰
   - 엘릭서 소비 로직

## 📊 수정 후 예상 동작

1. **카드 선택**
   - 카드 클릭 → 시각적으로 선택 표시 (황금색 테두리)
   - 콘솔: `"Card selected: KNIGHT"` (또는 ARCHER, GIANT)

2. **유닛 스폰**
   - 필드 클릭 → 클릭 위치에 유닛 생성
   - 엘릭서 감소
   - 콘솔: `"Spawning unit: KNIGHT at 200, 400"`

3. **전투**
   - 유닛이 자동으로 적을 향해 이동
   - 공격 범위 내 진입 시 자동 공격
   - HP 바로 체력 시각화

4. **승리/패배**
   - King Tower 파괴 시 게임 종료
   - Victory/Defeat 화면 표시

## 🎮 테스트 방법

```bash
npm run dev
```

1. Start Game 클릭
2. 엘릭서가 3 이상 될 때까지 대기
3. Knight 또는 Archer 카드 클릭 (선택된 카드에 황금색 테두리 표시 확인)
4. 화면 하단 절반 아무 곳이나 클릭
5. 브라우저 콘솔에서 로그 확인
6. 유닛이 스폰되고 적을 향해 이동하는지 확인

## 🔍 디버깅 팁

문제가 계속되면 브라우저 개발자 도구(F12) 콘솔을 열고:

1. 카드 클릭 시: `"Card selected: KNIGHT"` 메시지 확인
2. 필드 클릭 시:
   - `"Canvas clicked at: ..."` 확인
   - `"Canvas coordinates: ..."` 확인
   - `"Spawn attempt - Cost: 3, Available elixir: ..."` 확인
   - `"Spawning unit: ..."` 확인

에러 메시지가 나오면 해당 내용을 알려주세요.
