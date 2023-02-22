import './style.css';
import liff from '@line/liff';
import { Tooltip, Toast, Popover } from "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from "axios";
import {sha256, headerSet} from "../src/js/module";

headerSet();
const APPLY_LIST = document.getElementById('applyList');

liff.init({
    liffId: '1657935821-PNbmYlE5',
    // withLoginOnExternalBrowser: true,
})
    .then(() => {
        initialize();
    })
    .catch((error) => {
        console.log(error);
    });

function initialize() {
    liff.getProfile()
        .then((profile) => {
            sha256(profile.userId)
                .then(hash => {
                    let params = new URLSearchParams();
                    params.append('LINEID', hash);
                    axios.post('/src/php/applyGet.php', params)
                        .then(res => {
                            console.log(res.data);
                            res.data.apply.forEach((apply) => {
                                const LI = document.createElement('li');
                                LI.classList.add('list-group-item');
                                const COMPETITION_DATE = document.createElement('p');
                                COMPETITION_DATE.innerText = apply.DATE;
                                LI.appendChild(COMPETITION_DATE);
                                const COMPETITION_NAME = document.createElement('p');
                                COMPETITION_NAME.innerText = apply.competitionName;
                                LI.appendChild(COMPETITION_NAME);
                                const VENUE = document.createElement('p');
                                VENUE.innerText = apply.venue;
                                LI.appendChild(VENUE);
                                const PRICE = document.createElement('p');
                                PRICE.innerText = apply.price + '円';
                                LI.appendChild(PRICE);
                                const APPLIED = document.createElement('p');
                                APPLIED.innerText = apply.applied;
                                LI.appendChild(APPLIED);
                                APPLY_LIST.appendChild(LI);
                            })
                        })
                })
        })
}