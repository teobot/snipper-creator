var main = new Vue({
    el: '#main',
    data: {
        input: "",
        output: "",
        snippet_name: "",
        snippet_scope: "",
        snippet_prefix: "",
        snippet_desc: "",
        input_filled: false,
        snippet_name_filled: false,
        snippet_scope_filled: false,
        snippet_prefix_filled: false,
        snippet_desc_filled: false,
    },
    created() {
        console.log("Created");

    },
    methods: {
        convert: function() {
            var toConvertArray = main.input.split("\n");

            var returnString = "";

            returnString += `"${main.snippet_name}": {\n`;
            returnString += `\t"scope": "${main.snippet_scope}",\n`;
            returnString += `\t"prefix": "${main.snippet_prefix}",\n`;
            returnString += `\t"body": [\n`;

            toConvertArray.forEach(textLine => {
                var toConvert = textLine.replace(/\t/g, `\\t`);
                toConvert = toConvert.replace(/"/g, `\\"`);

                textLine = toConvert;
                returnString += '\t\t"' + textLine + '",' + "\n";

            });

            returnString += `\t],\n`;
            returnString += `\t"description": "${main.snippet_desc}"\n}`;

            main.output = returnString;
        },
    },
    computed: {
        b_dis: function() {
            if (this.input.length > 0) {
                this.input_filled = true;
            } else {
                this.input_filled = false;
            }

            if (this.snippet_name.length > 0) {
                this.snippet_name_filled = true;
            } else {
                this.snippet_name_filled = false;
            }

            if (this.snippet_scope.length > 0) {
                this.snippet_scope_filled = true;
            } else {
                this.snippet_scope_filled = false;
            }

            if (this.snippet_prefix.length > 0) {
                this.snippet_prefix_filled = true;
            } else {
                this.snippet_prefix_filled = false;
            }

            if (this.snippet_desc.length > 0) {
                this.snippet_desc_filled = true;
            } else {
                this.snippet_desc_filled = false;
            }

            if (this.snippet_name_filled && this.snippet_scope_filled && this.snippet_prefix_filled && this.snippet_desc_filled && this.input_filled) {
                return false;
            } else {
                return true;
            }
        },
        progressBar: function() {
            var percent = 0;
            var step = 20;
            if (this.snippet_name_filled) {
                percent += step;
            }
            if (this.snippet_scope_filled) {
                percent += step;
            }
            if (this.snippet_prefix_filled) {
                percent += step;
            }
            if (this.snippet_desc_filled) {
                percent += step;
            }
            if (this.input_filled) {
                percent += step;
            }
            return `width: ${percent}%`;
        }
    }
});

$(document).delegate('#input', 'keydown', function(e) {
    var keyCode = e.keyCode || e.which;

    if (keyCode == 9) {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;

        // set textarea value to: text before caret + tab + text after caret
        $(this).val($(this).val().substring(0, start) +
            "\t" +
            $(this).val().substring(end));

        // put caret at right position again
        this.selectionStart =
            this.selectionEnd = start + 1;
    }
});