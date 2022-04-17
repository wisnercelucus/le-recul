
export const dataURLtoBlob = (dataurl:any) => {
      let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type:mime});
    }
    
export const b64toBlob = (b64Data:any, contentType:any, sliceSize:any)=> {
      //console.log(b64Data)
      contentType = contentType || '';
      sliceSize = sliceSize || 512;
    
      const byteCharacters = window.atob(b64Data);
      const byteArrays = [];
    
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);
    
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }
    
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
      }
    
      const blob = new Blob(byteArrays, {type: contentType});
      return blob;
      }
    
export const blobFromUrl = (imageB64Url:any) => {
        //const ImageURL = imageB64Url
        //Split the base64 string in data and contentType
        const block = imageB64Url.split(";");
        // Get the content type of the image
        const contentType = block[0].split(":")[1];// In this case "image/gif"
        // get the real base64 content of the file
        const realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."
        //console.log(realData);
    
        // Convert it to a blob to upload
        const blob = b64toBlob(realData, contentType, null);
        //console.log(blob)
        return blob;
}