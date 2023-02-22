const sha256 = async (text) => {
    const uint8 = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest('SHA-256', uint8);
    return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2, '0')).join('');
}

function headerSet() {
    const HEADER = document.getElementById('header');
    HEADER.classList.add('container-fluid', 'd-flex', 'justify-content-between', 'align-items-center', 'bg-success', 'text-white', 'position-fixed', 'top-0', 'start-0');
    HEADER.style.height = '50px';
    const DIV1 = document.createElement('div');
    const A1 = document.createElement('a');
    A1.classList.add('text-white', 'text-decoration-none')
    A1.href = '/';
    const ICON = document.createElement('i');
    ICON.classList.add('bi', 'bi-calendar2-check');
    A1.appendChild(ICON);
    A1.innerHTML += '伊勢カントリークラブ';
    DIV1.appendChild(A1);
    HEADER.appendChild(DIV1);
    const DIV2 = document.createElement('div');
    const A2 = document.createElement('a');
    A2.classList.add('text-white', 'text-decoration-none')
    A2.href = '/mypage';
    const PERSON = document.createElement('i');
    PERSON.classList.add('bi', 'bi-person-square');
    A2.appendChild(PERSON);
    DIV2.appendChild(A2);
    HEADER.appendChild(DIV2);
}

export {sha256, headerSet}