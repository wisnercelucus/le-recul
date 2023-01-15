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
  