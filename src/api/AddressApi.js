export function handleFindAddr(inputs) {
    new daum.Postcode({
        oncomplete: (data) => {
            // 선택된 주소 처리
            let addr = '';
            if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
            } else {
                addr = data.jibunAddress;
            }

            // 외부로부터 받은 inputs 객체를 업데이트
            inputs['addressField'] = addr;
        },
    }).open();
}
