import './style.css';
import liff from '@line/liff';
import { Tooltip, Toast, Popover } from "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from "axios";
import {sha256, headerSet} from "../src/js/module";

headerSet();
const url = new URL(window.location.href);
const PARAMS = url.searchParams;
const PLAYER = PARAMS.get('player');
const MEMBER_ID = PARAMS.get('memberID');
const COMPETITION = PARAMS.get('competition');
const DATE = PARAMS.get('date');
const VENUE = PARAMS.get('venue');
const PRICE = PARAMS.get('price');
const NUM = PARAMS.get('num');
let LINEID = '';

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
    document.getElementById('competition').innerText = COMPETITION;
    document.getElementById('competitionPlayer').innerText = PLAYER;
    document.getElementById('competitionName').innerText = COMPETITION;
    document.getElementById('competitionDate').innerText = DATE;
    document.getElementById('competitionVenue').innerText = VENUE;
    document.getElementById('competitionPrice').innerText = PRICE;
    document.getElementById('apply').addEventListener('click', apply);
    liff.getProfile()
        .then((profile) => {
            LINEID = profile.userId;
        })
}

function apply() {
    let params = new URLSearchParams();
    params.append('memberID', MEMBER_ID);
    params.append('competitionNum', NUM);
    // params.append('LINEID', LINEID);
    axios.post('/src/php/apply.php', params)
        .then((res) => {
            console.log(res.data);
            if (res.data.check) {
                if (liff.isInClient()) {
                    liff.sendMessages([
                        // {
                        //     type: "bubble",
                        //     hero: {
                        //         type: "image",
                        //         url: "https://www.ise-countryclub-reserve.com/src/data/golf.jpg",
                        //         size: "full",
                        //         aspectRatio: "20:13",
                        //         aspectMode: "cover"
                        //     },
                        //     body: {
                        //         type: "box",
                        //         layout: "vertical",
                        //         spacing: "md",
                        //         contents: [
                        //             {
                        //                 type: "text",
                        //                 text: COMPETITION,
                        //                 wrap: true,
                        //                 weight: "bold",
                        //                 gravity: "center",
                        //                 size: "xl"
                        //             },
                        //             {
                        //                 type: "box",
                        //                 layout: "vertical",
                        //                 margin: "lg",
                        //                 spacing: "sm",
                        //                 contents: [
                        //                     {
                        //                         type: "box",
                        //                         layout: "baseline",
                        //                         spacing: "sm",
                        //                         contents: [
                        //                             {
                        //                                 type: "text",
                        //                                 text: "日程",
                        //                                 color: "#aaaaaa",
                        //                                 size: "sm",
                        //                                 flex: 1
                        //                             },
                        //                             {
                        //                                 type: "text",
                        //                                 text: DATE,
                        //                                 wrap: true,
                        //                                 size: "sm",
                        //                                 color: "#666666",
                        //                                 flex: 4
                        //                             }
                        //                         ]
                        //                     },
                        //                     {
                        //                         type: "box",
                        //                         layout: "baseline",
                        //                         spacing: "sm",
                        //                         contents: [
                        //                             {
                        //                                 type: "text",
                        //                                 text: "会場",
                        //                                 color: "#aaaaaa",
                        //                                 size: "sm",
                        //                                 flex: 1
                        //                             },
                        //                             {
                        //                                 type: "text",
                        //                                 text: VENUE,
                        //                                 wrap: true,
                        //                                 color: "#666666",
                        //                                 size: "sm",
                        //                                 flex: 4
                        //                             }
                        //                         ]
                        //                     },
                        //                     {
                        //                         type: "box",
                        //                         layout: "baseline",
                        //                         spacing: "sm",
                        //                         contents: [
                        //                             {
                        //                                 type: "text",
                        //                                 text: "参加料",
                        //                                 color: "#aaaaaa",
                        //                                 size: "sm",
                        //                                 flex: 1
                        //                             },
                        //                             {
                        //                                 type: "text",
                        //                                 text: PRICE,
                        //                                 wrap: true,
                        //                                 color: "#666666",
                        //                                 size: "sm",
                        //                                 flex: 4
                        //                             }
                        //                         ]
                        //                     }
                        //                 ]
                        //             }
                        //         ]
                        //     },
                        //     footer: {
                        //         type: "box",
                        //         layout: "vertical",
                        //         contents: [
                        //             {
                        //                 type: "text",
                        //                 text: "以上の申込を受け付けました。"
                        //             }
                        //         ]
                        //     }
                        // },
                        {
                            type: 'text',
                            text: COMPETITION + 'の受付が完了しました',
                        }
                    ]).then(() => {
                        window.alert('messsage sent');
                    }).catch(err => {
                        window.alert(err);
                    })
                } else {
                    window.alert('LIFFでアクセスしてください。');
                }
                window.alert('申し込みが完了しました\nTOPページに戻ります');
            } else {
                window.alert(res.data.msg);
            }
        }).catch(err => {
        console.log(err);
    })
}