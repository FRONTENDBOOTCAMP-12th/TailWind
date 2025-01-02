import { pb } from '@/api/PocketHost.js';

export function handleFindAddr(inputs, userId) {
    new daum.Postcode({
        oncomplete: (data) => {
            // 선택된 주소 처리
            console.log(userId);
            let addr = '';
            if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
            } else {
                addr = data.jibunAddress;
            }

            // 외부로부터 받은 inputs 객체를 업데이트
            inputs['addressField'] = addr;

            // 이메일 주소를 pockethost를 통해 업데이트
            if (userId) {
                try {
                    pb.collection('user_address').create({
                        user: userId,
                        user_address: addr,
                    });
                } catch (err) {
                    alert('경고');
                }
            }
        },
    }).open();
}
