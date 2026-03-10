"use client";

import { Editor } from "@tinymce/tinymce-react";

interface Props {
  value: string;
  onChange: (content: string) => void;
}

export default function RichEditor({ value, onChange }: Props) {

  return (

<div className="border rounded-xl overflow-hidden bg-white">

<Editor
apiKey="a9odya4051y6ltkl9vmjkn2r6flwner8rd221h1rfks4mce8"
value={value}

onEditorChange={(content) => {
  onChange(content);
}}

init={{

height: 600,

menubar: true,

plugins: [
"advlist",
"autolink",
"lists",
"link",
"image",
"media",
"table",
"code",
"fullscreen",
"wordcount"
],

toolbar:
"undo redo | blocks | bold italic underline | \
alignleft aligncenter alignright alignjustify | \
bullist numlist outdent indent | link image media table | code fullscreen",

paste_data_images: true,

valid_elements: "*[*]",
extended_valid_elements: "*[*]",

content_style: `
body {
  font-family: Arial, sans-serif;
  font-size: 16px;
}
`

}}

 />

</div>

  );

}