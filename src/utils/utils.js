export function navigate(url) {
    location.href = url;
}

// 대괄호와 소괄호 및 단위를 한글로 수정하는 함수
export function createAriaText(str) {
    str = str.replace(/[[,\],(,)]/g, '');
    str = str.replace('*', '곱하기');
    str = str.replace('X', '곱하기');
    str = str.replace('x', '곱하기');
    str = str.replace('mL', '밀리리터');
    str = str.replace('ml', '밀리리터');
    str = str.replace('kg', '킬로그램');
    str = str.replace('Kg', '킬로그램');
    str = str.replace('KG', '킬로그램');
    str = str.replace('g', '그램');
    str = str.replace('G', '그램');

    return str;
}
