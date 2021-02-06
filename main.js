import m from 'mithril';
import tagl from 'tagl-mithril';
import urlStorage, {linkComponent} from './urlStorage';

// prettier-ignore
const { address, aside, footer, header, h1, h2, h3, h4, h5, h6, hgroup, main, nav, section, article, blockquote, dd, dir, div, dl, dt, figcaption, figure, hr, li, ol, p, pre, ul, a, abbr, b, bdi, bdo, br, cite, code, data, dfn, em, i, kdm, mark, q, rb, rp, rt, rtc, ruby, s, samp, small, span, strong, sub, sup, time, tt, u, wbr, area, audio, img, map, track, video, embed, iframe, noembed, object, param, picture, source, canvas, noscript, script, del, ins, caption, col, colgroup, table, tbody, td, tfoot, th, thead, tr, button, datalist, fieldset, form, formfield, input, label, legend, meter, optgroup, option, output, progress, select, textarea, details, dialog, menu, menuitem, summary, content, element, slot, template } = tagl(m);

const {min, max} = Math;
const clone = (frame) => JSON.parse(JSON.stringify(frame));
const use = (v, fn) => fn(v);

const projectIDs = JSON.parse(localStorage.getItem('projectIDs')) || [];
const save = function (projectID, projectData) {
    localStorage.setItem(projectID, JSON.stringify(projectData));
    projectIDs.splice(projectIDs.indexOf(projectID));
    projectIDs.push(projectID);
    localStorage.setItem('projectIDs', JSON.stringify(projectIDs));
};

const load = function (projectID) {
    return JSON.parse(localStorage.getItem(projectID));
};

const createProject = function (incoming) {
    let currentFrameIdx = 0;
    let projectID = new Date().toISOString();
    let frames = incoming || [ //|| ["\n\n\n\n                    1\n\n\n\n\n", "\n\n\n\n                    2\n\n\n\n\n", "\n\n\n\n                    3\n\n\n\n\n", "\n\n\n\n                    4\n\n\n\n\n", "\n\n\n\n                 Welcome\n\n\n\n\n", "\n\n\n\n                 Welcome\n                   In\n\n\n\n", "\n\n\n\n                 Welcome\n                   In\n                   The\n\n\n", "\n                   _o_\n                    H\n\n                 Welcome\n                   In\n                   The \n                Ascii-World\n\n", "\n                   \\o_\n                    H\n\n                 Welcome\n                   In\n                   The \n                Ascii-World\n\n", "\n                   /o_\n                    H\n\n                 Welcome\n                   In\n                   The \n                Ascii-World\n\n", "\n                   \\o_\n                    H\n\n                 Welcome\n                   In\n                   The \n                Ascii-World\n\n", "\n                   \\o_\n                    H\n\n                 Welcome\n                   In\n                   The \n                Ascii-World\n\n", "\n                   /o_\n                    H\n\n                 Welcome\n                   In\n                   The \n                Ascii-World\n\n", "\n                   \\o/\n                    H\n\n                 Welcome\n                   In\n                   The \n                Ascii-World\n\n", "\n                   \\o/\n                    H\n\n                 Welcome\n                   In\n                   The \n                Ascii-World\n\n", "\n                   \\o/\n                    H\n\n                 Welcome\n                   In\n                   The \n                Ascii-World\n\n", "\n                   \\o/\n                    H\n\n                 Welcome\n                   In\n                   The \n                Ascii-World\n\n"];
        '\n\n\n\n                    1\n\n\n\n\n',
        '\n\n\n\n                    2\n\n\n\n\n',
        '\n\n\n\n                    3\n\n\n\n\n',
        '\n\n\n\n                    4\n\n\n\n\n',
        '\n\n\n\n                 Welcome\n\n\n\n\n',
        '\n\n\n\n                 Welcome\n                   In\n\n\n\n',
        '\n\n\n\n                 Welcome\n                   In\n                   The\n\n\n',
        '\n                   _o_\n                    H\n\n                 Welcome\n                   In\n                   The \n                Ascii-World\n\n',
        '\n                   \\o_\n                    H\n\n                 Welcome\n                   In\n                   The \n                Ascii-World\n\n',
        '\n                   /o_\n                    H\n\n                 Welcome\n                   In\n                   The \n                Ascii-World\n\n',
        '\n                   \\o_\n                    H\n\n                 Welcome\n                   In\n                   The \n                Ascii-World\n\n',
        '\n                   \\o_\n                    H\n\n                 Welcome\n                   In\n                   The \n                Ascii-World\n\n',
        '\n                   /o_\n                    H\n\n                 Welcome\n                   In\n                   The \n                Ascii-World\n\n',
        '\n                   \\o/\n                    H\n\n                 Welcome\n                   In\n                   The \n                Ascii-World\n\n',
        '\n                   \\o/\n                    H\n\n                 Welcome\n                   In\n                   The \n                Ascii-World\n\n',
        '\n                   \\o/\n                    H\n\n                 Welcome\n                   In\n                   The \n                Ascii-World\n\n',
        '\n                   \\o/\n                    H\n\n                 Welcome\n                   In\n                   The \n                Ascii-World\n\n',
        '___________________________\n                   \\o/\n                    H\n\n                 \n\n\n\n\n',
        '\n___________________________\n                   \\o/\n                    H\n                 \n\n\n\n\n',
        '\n\n___________________________\n                   \\o/\n                    H\n                 \n\n\n\n',
        '\n\n\n___________________________\n                   \\o/\n                    H              \n\n\n\n',
        '\n\n\n___________________________\n                   \\o/\n                    ^              \n\n\n\n',
        '\n\n\n___________________________\n                   \\o/\n                    H              \n\n\n\n',
        '\n\n\n___________________________\n                   \\o/\n                    ^              \n\n\n\n',
        '\n\n\n___________________________\n                   \\o/\n                    H              \n\n\n\n',
        '\n\n\n___________________________\n                   \\O/\n                    M              \n\n\n\n',
        '\n\n\n___________________________\n                   \\o/\n                    H              \n\n\n\n',
        '\n\n\n___________________________\n                   \\./\n                    ^              \n\n\n\n',
        '\n\n\n___________________________\n                   \\o/\n                    H              \n\n\n\n',
        '\n\n\n___________________________\n                   \\O/\n                    ^              \n\n\n\n',
        '\n\n\n___________________________\n                   \\O/\n                    ^              \n\n\n\n',
        '\n\n\n___________________________\n                   \\H/\n                                  \n\n\n\n',
        '\n\n\n____________________H______\n                   \\O/\n                                  \n\n\n\n',
        '\n\n                    H\n___________________/O\\_____\n                   \n                                  \n\n\n\n',
        '\n\n                    V\n___________________/O\\_____\n                   \n                                  \n\n\n\n',
        '\n\n                    H\n___________________/O\\_____\n                   \n                                  \n\n\n\n',
        '\n\n                    V\n___________________/O\\_____\n                   \n                                  \n\n\n\n',
        '\n\n                    \n___________________/O\\_____\n                   \n                                  \n\n\n\n',
        '\n\n                    \n___________________/O\\_____\n                   \n                                  \n\n\n\n',
        '\n\n                    \n___________________/O\\_____\n                    ^\n                                  \n\n\n\n',
        '\n\n                    \n___________________________\n                   \\O \n                    X\\              \n\n\n\n',
        '\n\n                    ?\n___________________________\n                   \\O  \n                    X\\              \n\n\n\n',
        '\n\n                    ?\n___________________________\n                   \\O  \n                    X\\              \n\n\n\n                   \\    /',
        '\n\n                    ?\n___________________________\n                   \\O  \n                    X\\              \n\n\n                   \\    /\n                    \\  /',
        '\n\n                    ?\n___________________________\n                   \\O  \n                    X\\              \n                   \\    /\n                    \\  /\n                     \\/\n                     OO',
        '\n\n                    ?\n___________________________\n                   \n                   \\O  \n                  \\ X\\ /              \n                   \\  /\n                    \\/\n                    OO',
        '\n\n                    !\n___________________________\n                   \n                   \\O  \n                  \\ X\\ /              \n                   \\  /\n                    \\/\n                    OO',
        '\n\n                    !\n___________________________\n                   \n                   \\O  \n                   ||               \n                   ||  \n                   ||\n                   OO',
        '\n\n                    \n___________________________\n                   \n\n                   \\O  \n                   ||               \n                   ||  \n                   ||',
        '\n\n                    \n___________________________\n                   \n\n\n                   \\O  \n                   ||               \n                   ||  ',
        '\n\n                    \n___________________________\n                   \n\n\n\n                   \\O  \n                   ||               ',
        '\n\n                    \n___________________________\n                   \n\n\n\n\n                   \\O  ',
        '\n\n                    \n___________________________\n                   \n\n\n\n\n                          |\\',
        '\n\n                    \n___________________________\n                   \n\n\n\n\n                           |\\',
        '\n\n                    \n___________________________\n                   \n\n\n\n\n                            |\\',
        '\n\n                    \n___________________________\n                   \n\n\n\n\n                              |\\',
        '\n\n                    \n___________________________\n                   \n\n\n\n\n                                  |\\',
        '\n\n                    \n___________________________\n                   \n\n\n\n\n                                      |\\',
        '\n\n                    \n___________________________\n                   \n\n\n\n\n                                        ',
    ];
    return {
        rows: () => 10,
        cols: () => 40,
        projectID: (p = projectID) => (projectID = p),
        clear: () => (frames = []),
        save: () => save(projectID, {frames}),
        load: (_projectID) => {
            let project = load(_projectID);
            console.log(project);
            frames = project.frames;
            projectID = _projectID;
            currentFrameIdx = max(0, min(frames.length, currentFrameIdx));
        },
        frames: () => frames,
        currentFrameIdx: (a = currentFrameIdx) => (currentFrameIdx = max(0, min(a, frames.length))),
        currentFrame: (frame = frames[currentFrameIdx]) => (frames[currentFrameIdx] = frame),
        addFrame: function () {
            frames.push(frames.length > 0 ? clone(frames[currentFrameIdx]) : 'Welcome\nIn\nThe\nAsciiWorld');
            currentFrameIdx = frames.length - 1;
            setTimeout(m.redraw, 100);
        },
    };
};

const playback = function (vnode) {
    let playbackFrameIdx = 0;
    let playbackTimeID = undefined;
    let playbackSpeed_ = 300;

    const playbackSpeed = (a = playbackSpeed_) => (playbackSpeed_ = a);
    const playback = () =>
        (playbackTimeID = setInterval(() => {
            playbackFrameIdx = ++playbackFrameIdx % frames.length;
            m.redraw();
        }, playbackSpeed_));
    const playback_stop = () => (playbackTimeID = clearInterval(playbackTimeID));
    const playback_stepback = () =>
        (playbackFrameIdx = playbackFrameIdx - 1 + (playbackFrameIdx < 1 ? frames.length : 0));
    const playback_stepforward = () => (playbackFrameIdx = (playbackFrameIdx + 1) % frames.length);

    let frames = [];
    let hidden = false;

    return {
        oninit: (vnode) => {
            if (vnode.attrs.autoplay) playback();
            if (vnode.attrs.showControls) hidden = true;
        },
        playback,
        playback_stop,
        playbackSpeed,
        view: function ({attrs, showControls = false}) {
            frames = attrs.frames();
            return div(
                pre(
                    frames[playbackFrameIdx],
                    showControls
                        ? null
                        : button(
                              {
                                  style: 'float:right;',
                                  onclick: () => (hidden = !hidden),
                              },
                              !hidden ? '^' : 'v'
                          )
                ), //
                !hidden
                    ? [
                          div.buttonGroup(
                              button({onclick: playback_stepback}, '|<'),
                              button({disabled: !!playbackTimeID, onclick: playback}, '>'),
                              button({disabled: !playbackTimeID, onclick: playback_stop}, '#'),
                              button({onclick: playback_stepforward}, '>|'),
                              queryStringFrames
                                  ? button(
                                        {
                                            onclick: () => {
                                                save('From URL', {frames});
                                                window.location.href = '/';
                                            },
                                        },
                                        'Edit'
                                    )
                                  : null
                          ),
                          input({
                              type: 'number',
                              value: playbackSpeed(),
                              oninput: (e) => playbackSpeed(Number(e.target.value)),
                          }),
                      ]
                    : null
            );
        },
    };
};

let queryStringFrames = urlStorage.loadFromURL();

if (!queryStringFrames) {
    let project = createProject();

    m.mount(document.body, {
        view: (vnode) => [
            h1('Ascii Art Movie Editor'),
            input({value: project.projectID(), oninput: (e) => project.projectID(e.target.value)}),
            br(),
            textarea.$screen({
                rows: project.rows(),
                cols: project.cols(),
                value: project.currentFrame(),
                oninput: (e) => {
                    project.currentFrame(e.target.value);
                    urlStorage.updateURL(project.frames());
                },
            }),
            br(),
            button(
                {
                    onclick: () => project.addFrame(),
                },
                'Add Frame'
            ),
            input({
                type: 'range',
                oninput: (e) => project.currentFrameIdx(Number(e.target.value)),
                value: project.currentFrameIdx(),
                min: 0,
                max: project.frames().length - 1,
            }),
            project.currentFrameIdx() + 1,
            '|',
            project.frames().length,
            br(),
            div.buttonGroup(
                button({onclick: () => project.clear()}, 'clear'),
                button({onclick: () => project.save()}, 'save'),
                select.button(
                    option('None'),
                    projectIDs.map((id) => option({onclick: () => project.load(id)}, id))
                )
            ),
            m(playback, {frames: () => project.frames()}),
            //   pre(location.href + "?frames=" + btoa(JSON.stringify(project.frames()))),
            m(linkComponent),
        ],
    });
} else {
    let project = createProject(queryStringFrames);

    m.mount(document.body, {
        view: (vnode) => [m(playback, {showControls: true, autoplay: true, frames: () => project.frames()})],
    });
}
