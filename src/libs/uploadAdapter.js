import { apiUpLoad } from '@/api'

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

export function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) =>
    new MyUploadAdapter(loader)
}
