import * as P from 'ts-prime'

import marked from 'marked'
// require("./beautify.js")
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/typescript'
hljs.registerLanguage('typescript', javascript);


export function renderMarkdown(content: string) {
    return marked.setOptions({
        highlight: function (code) {
            const res = P.canFail(() => hljs.highlight('typescript', code).value)
            if (P.isError(res)) {
                return code
            }

            return res
        }
    })(content)
}


export function beautify(code: string): string {
    // return code
    return (window as any)?.js_beautify(code, {
        "indent_size": "4",
        "indent_char": " ",
        "max_preserve_newlines": "5",
        "preserve_newlines": true,
        "keep_array_indentation": true,
        "break_chained_methods": false,
        "indent_scripts": "keep",
        "brace_style": "collapse,preserve-inline",
        "space_before_conditional": true,
        "unescape_strings": true,
        "jslint_happy": true,
        "end_with_newline": true,
        "wrap_line_length": "0",
        "indent_inner_html": true,
        "comma_first": false,
        "e4x": true,
        "indent_empty_lines": true
    })
}