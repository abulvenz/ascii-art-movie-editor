import m from 'mithril';
import tagl from 'tagl-mithril';

// prettier-ignore
const { address, aside, footer, header, h1, h2, h3, h4, h5, h6, hgroup, main, nav, section, article, blockquote, dd, dir, div, dl, dt, figcaption, figure, hr, li, ol, p, pre, ul, a, abbr, b, bdi, bdo, br, cite, code, data, dfn, em, i, kdm, mark, q, rb, rp, rt, rtc, ruby, s, samp, small, span, strong, sub, sup, time, tt, u, wbr, area, audio, img, map, track, video, embed, iframe, noembed, object, param, picture, source, canvas, noscript, script, del, ins, caption, col, colgroup, table, tbody, td, tfoot, th, thead, tr, button, datalist, fieldset, form, formfield, input, label, legend, meter, optgroup, option, output, progress, select, textarea, details, dialog, menu, menuitem, summary, content, element, slot, template } = tagl(m);

const t = e => e;

function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
}

function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

const updateURL = () => {
    window.location.search = m.buildQueryString({ data: b64EncodeUnicode(JSON.stringify(_data)) })
    return true;
};


let result = '';

function selectText(containerid) {
    result = '';
    if (document.selection) { // IE
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
    try {
        var ok = document.execCommand('copy');
        if (ok) result = t('Copied!');
        else result = t('Unable to copy!');
    } catch (err) {
        result = t('Unsupported Browser!');
    }
    setTimeout(() => {
        result = '';
        m.redraw();
    }, 2000)
}


export default {
    updateURL,
    loadFromURL: () => {
        let queryData = m.parseQueryString(window.location.search);
        if (queryData.data) {
            return JSON.parse(b64DecodeUnicode(queryData.data));
        }
        return undefined;
    },

}

export const linkComponent = function(vnode) {
    return {
        view: vnode => [
            hr(),
            div.container(
                div.row(
                    div['col-md-2'](span({ "class": "icon-share" }), t('Share the current state by copying this link.')),
                    div['col-md-7 col-sm-12'](
                        pre.overflowHidden.$linktext(window.location.href),
                        t('The link will change with each change you make.'),
                        result ? div.toast(result) : null
                    ),
                    div['col-md-3'](
                        button({
                            onclick: e => selectText('linktext')
                        }, t('Select link')),
                    ),
                )
            )
        ]
    };
}