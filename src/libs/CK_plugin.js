import { apiUpLoad } from '@/api'
import '@ckeditor/ckeditor5-build-classic/build/translations/zh'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Link from '@ckeditor/ckeditor5-link/src/link'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import ListProperties from '@ckeditor/ckeditor5-list/src/listproperties'
import Indent from '@ckeditor/ckeditor5-indent/src/indent'
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock'
import Image from '@ckeditor/ckeditor5-image/src/image'
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption'
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize'
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert'
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote'
import Font from '@ckeditor/ckeditor5-font/src/font'
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed'
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters'
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials'
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline'
import Table from '@ckeditor/ckeditor5-table/src/table'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties'
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties'
class MyUploadAdapter {
  constructor(loader) {
    // 上傳使用的文件加載器實例
    this.loader = loader
  }

  // 開始上傳過程
  async upload() {
    const file = await this.loader.file
    const formData = new FormData()
    formData.append('file-to-upload', file)

    const res = await apiUpLoad(formData)
    return { default: res.data.imageUrl }
  }
}

//圖片上傳功能
function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) =>
    new MyUploadAdapter(loader)
}

function SpecialCharactersEmoji(editor) {
  editor.plugins.get('SpecialCharacters').addItems('Emoji', [
    { title: 'smiley face', character: '😊' },
    { title: 'coffee', character: '☕' },
    { title: 'tropical drink', character: '🍹' },
    { title: 'sparkles', character: '✨' },
    { title: 'heart', character: '❤️' }
  ])
}

export default {
  plugins: [
    Essentials,
    Bold,
    Italic,
    Link,
    Paragraph,
    Heading,
    ListProperties,
    Indent,
    IndentBlock,
    Image,
    ImageToolbar,
    ImageCaption,
    ImageStyle,
    ImageResize,
    ImageInsert,
    Alignment,
    BlockQuote,
    Font,
    MediaEmbed,
    SpecialCharacters,
    SpecialCharactersEssentials,
    SpecialCharactersEmoji,
    HorizontalLine,
    Table,
    TableToolbar,
    TableProperties,
    TableCellProperties
  ],
  toolbar: {
    items: [
      'heading',
      '|',
      'fontSize',
      'fontFamily',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'alignment',
      '|',
      'outdent',
      'indent',
      'blockQuote',
      'horizontalLine',
      '|',
      'specialCharacters',
      '|',
      'insertImage',
      '|',
      'mediaEmbed',
      '|',
      'insertTable',
      '|',
      'undo',
      'redo'
    ],
    shouldNotGroupWhenFull: true
  },
  image: {
    toolbar: [
      'imageStyle:alignLeft',
      'imageStyle:alignRight',
      'imageStyle:alignCenter',
      'imageStyle:inline',
      'imageStyle:block',
      'imageStyle:alignBlockLeft',
      'imageStyle:alignBlockRight',
      'imageStyle:side',
      'toggleImageCaption',
      'resizeImage',
      'imageTextAlternative'
    ]
  },
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true
    }
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableProperties',
      'tableCellProperties'
    ]
  },
  extraPlugins: [MyCustomUploadAdapterPlugin],
  language: 'zh'
}
