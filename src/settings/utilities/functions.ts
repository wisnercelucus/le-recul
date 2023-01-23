import Swal from 'sweetalert2'

export  function getModelToQuery(model: string): string{
    if(model.endsWith('s')) {
        return model.split('-').join('').slice(0, -1);
    }
    return model
}

export function normalizeTitle(value:any){
    const letters = value.split('');
    const first_letter = letters[0];
    let title = first_letter.toUpperCase() + letters.slice(1, letters.length).join('');
    if(title === '_id'){
      return 'UUID';
    }

    title = title.split('_').join(' ');

    return title;
  }


  export function capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  


  export function openSwalDialog(title: string, body: string, a_type: any){
    Swal.fire(
      title,
      body,
      a_type
    )
  }

  export function openSwalDialogWithOptions(title: string, body: string, icon: any){
    Swal.fire({
      icon: icon,
      title: title,
      text: body,
      //footer: '<a href="">Why do I have this issue?</a>'
    })
  }
 
  export function openAnimatedSwalDialog(title: string, body: string, icon: any){
    Swal.fire({
      icon: icon,
      title: title,
      text: body,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }

  export function openSwalDialogWithActionButtons(title: string){
    return Swal.fire({
      title: title,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    })
    /*.then((result) => {
      
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })*/
  }