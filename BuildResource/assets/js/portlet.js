window.addEventListener("DOMContentLoaded", function () {
    let draggableSortable;

    // 빈 포틀릿 그룹의 HTML 생성
    function getEmptyPortletHTML() {
        return `<div class="inner"><img src="../../assets/images/portlet-empty.png" alt=""></div>`;
    }

    // Sortable 인스턴스 재생성을 위한 유틸 함수
    function reinitializeSortable() {
        if (draggableSortable) {
            draggableSortable.destroy();
            initDraggableSortable();
        }
    }

    // 포틀릿 삭제 함수: 삭제 시 빈 상태로 전환하고, 필요하면 후행 empty 그룹 생성
    function portletDelete(target) {
        const sidebarItems = document.querySelectorAll('.sidebar__menu li');
        const dataContent = target.getAttribute('data-content');

        // 대상 그룹을 빈 상태로 전환
        target.classList.add('is-empty');
        target.removeAttribute('data-content');
        target.removeAttribute('draggable');
        target.innerHTML = getEmptyPortletHTML();

        // is-col-2인 경우, 후행 empty 그룹 생성 후 is-col-2 클래스 제거
        if (target.classList.contains('is-col-2')) {
            const afterGroup = document.createElement('div');
            afterGroup.className = 'portlet__group is-empty';
            afterGroup.innerHTML = getEmptyPortletHTML();
            target.classList.remove('is-col-2');
            target.after(afterGroup);
        }

        // 사이드바 메뉴에서 선택 상태 해제
        sidebarItems.forEach(li => {
            if (li.getAttribute('data-title') === dataContent) {
                li.classList.remove('is-selected');
            }
        });

        console.log(target);
        reinitializeSortable();
    }

    // 포틀릿 hover 이벤트: 이벤트 위임으로 동적 요소에도 적용
    function setupPortletHoverDelegation() {
        const portlet = document.getElementById('portlet');
        if (!portlet) return;

        portlet.addEventListener('mouseover', function (e) {
            const group = e.target.closest('.portlet__group');
            if (!group) return;
            // 이미 dim이 있으면 추가하지 않음
            if (group.querySelector('.dim')) return;

            const dim = document.createElement('div');
            dim.className = 'dim';
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'btn has-icon';
            btn.innerHTML = '<i class="icon is-42 is-delete-42"></i>';
            dim.appendChild(btn);
            group.appendChild(dim);

            btn.onclick = () => portletDelete(group);
        });

        portlet.addEventListener('mouseout', function (e) {
            const group = e.target.closest('.portlet__group');
            if (!group) return;
            // 그룹 내부 이동이면 무시
            if (e.relatedTarget && group.contains(e.relatedTarget)) return;
            const dim = group.querySelector('.dim');
            if (dim) {
                dim.remove();
            }
        });
    }

    // Sortable 인스턴스 생성 함수
    function initDraggableSortable() {
        draggableSortable = Sortable.create(document.getElementById('draggable'), {
            group: {
                name: 'widgets',
                pull: 'clone',  // 드래그 시 복제
                put: false      // 사이드바로는 놓을 수 없음
            },
            sort: false,       // 사이드 메뉴 내 순서 변경 불필요
            filter: '.is-selected',
            onMove: function (evt, originalEvent) {
                const col = evt.dragged.getAttribute('data-col');
                // 실제 HTML 구조에 맞게 선택자 수정 (내부의 .inner 요소 선택)
                const group = evt.to.closest('.portlet__group.is-empty .inner'); 
                
                if (col == 2 && group && group.nextElementSibling) {
                    return false;
                }

                evt.dragged.innerHTML = '';
                return true;
            },
            onEnd: function (evt) {
                const group = evt.to.closest('.portlet__group');
                const col = evt.item.getAttribute('data-col');
                const title = evt.item.getAttribute('data-title');
                const image = evt.item.getAttribute('data-image');
            
                if (group) {
                    const img = document.createElement('img');
                    img.setAttribute('src', image);
            
                    evt.clone.classList.add('is-selected');
                    group.classList.remove('is-empty');
                    group.setAttribute('data-content', title);
            
                    if (col == 2) {
                        group.classList.add('is-col-2');
            
                        let targetToRemove = null;
                        // 우선적으로 인접한 next 요소가 is-empty인 경우
                        if (group.nextElementSibling && group.nextElementSibling.classList.contains('is-empty')) {
                            targetToRemove = group.nextElementSibling;
                        } 
                        // next가 없으면 인접한 previous 요소가 is-empty인지 확인
                        else if (group.previousElementSibling && group.previousElementSibling.classList.contains('is-empty')) {
                            targetToRemove = group.previousElementSibling;
                        } 
                        // 인접 요소가 없으면 전체 형제 요소에서 is-empty인 요소를 검색
                        else {
                            const siblings = Array.from(group.parentNode.children);
                            targetToRemove = siblings.find(el => el !== group && el.classList.contains('is-empty'));
                        }
            
                        if (targetToRemove) {
                            targetToRemove.remove();
                        } else {
                            // 조건 미충족 시 드랍 취소 처리
                            evt.clone.classList.remove('is-selected');
                            group.classList.add('is-empty');
                            group.classList.remove('is-col-2');
                            group.removeAttribute('data-content');
                            alert("드랍할 수 없습니다. 인접 혹은 형제 요소 중 is-empty를 가진 요소가 없습니다.");
                            return;
                        }
                    }
            
                    group.innerHTML = '';
                    group.appendChild(img);
                }
            }            
        });

        const targets = document.querySelectorAll('.portlet__group.is-empty .inner');
        targets.forEach(target => {
            Sortable.create(target, {
                group: {
                    name: 'widgets', // 사이드바와 동일한 그룹 이름
                    pull: false,
                    put: true       // 다른 컨테이너(또는 사이드바)에서 가져온 위젯을 놓을 수 있음
                },
                animation: 150,
                sort: true // 각 컬럼 내 위젯 순서 변경 가능
            });
        });

        Sortable.create(document.getElementById('portlet'), {
            group: {
                pull: false,
                put: false  // 사이드바로는 놓을 수 없음
            },
            sort: true
        });
    }
    
    const portletGroup = document.querySelectorAll('.portlet__group');
    portletGroup.forEach(group => {
        group.addEventListener('dragstart', () => {
          const img = group.querySelector('img');
          if (img) {
            img.style.pointerEvents = 'none'; // 드래그 시 이미지가 이벤트를 막지 않도록 설정
          }
        });
        
        group.addEventListener('dragend', () => {
          const img = group.querySelector('img');
          if (img) {
            img.style.pointerEvents = ''; // 드래그 종료 후 원래대로 복원
          }
        });
      });

    // 초기화: 이벤트 위임 및 Sortable 생성
    setupPortletHoverDelegation();
    initDraggableSortable();
});
