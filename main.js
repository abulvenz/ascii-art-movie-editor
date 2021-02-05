import m from "mithril";
import tagl from "tagl-mithril";

// prettier-ignore
const { address, aside, footer, header, h1, h2, h3, h4, h5, h6, hgroup, main, nav, section, article, blockquote, dd, dir, div, dl, dt, figcaption, figure, hr, li, ol, p, pre, ul, a, abbr, b, bdi, bdo, br, cite, code, data, dfn, em, i, kdm, mark, q, rb, rp, rt, rtc, ruby, s, samp, small, span, strong, sub, sup, time, tt, u, wbr, area, audio, img, map, track, video, embed, iframe, noembed, object, param, picture, source, canvas, noscript, script, del, ins, caption, col, colgroup, table, tbody, td, tfoot, th, thead, tr, button, datalist, fieldset, form, formfield, input, label, legend, meter, optgroup, option, output, progress, select, textarea, details, dialog, menu, menuitem, summary, content, element, slot, template } = tagl(m);

const { min, max } = Math;

const clone = (frame) => JSON.parse(JSON.stringify(frame));

const createProject = function() {
    let currentFrameIdx = 0;
    let frames = [
        "Welcome\nIn\nThe\nAsciiWorld"
    ];
    return {
        frames: () => frames,
        currentFrameIdx: (a = currentFrameIdx) => currentFrameIdx = max(0, min(a, frames.length)),
        currentFrame: (frame = frames[currentFrameIdx]) => frames[currentFrameIdx] = frame,
        addFrame: function() {
            frames.push(
                frames.length > 0 ?
                clone(frames[frames.length - 1]) : "Welcome\nIn\nThe\nAsciiWorld"
            );
        }
    };
};

let project = createProject();



m.mount(document.body, {
    view: (vnode) => [
        h1("Ascii Art Movie Editor"),
        textarea.$screen({
            rows: 10,
            cols: 40,
            value: project.currentFrame(),
            oninput: e => project.currentFrame(e.target.value)
        }), br(),
        button({
            onclick: () => project.addFrame()
        }, "Add Frame"),
        input({
            type: "range",
            oninput: e => project.currentFrameIdx(Number(e.target.value)),
            value: project.currentFrame,
            min: 0,
            max: project.frames().length
        }),
        project.frames().length,
        pre(JSON.stringify(project.frames(), null, 2))
    ]
});