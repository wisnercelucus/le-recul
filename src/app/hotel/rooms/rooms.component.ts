import { Component, Input, OnDestroy, OnInit, Pipe, PipeTransform, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataTablesService } from 'src/app/data-tables/data-tables.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'vn-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RoomsComponent implements OnInit, OnDestroy {
  rooms: any[] = []
  subs = new SubSink()
  @Input() displayFooter=true
  constructor(private _datatableService: DataTablesService,
    private _sanitizer: DomSanitizer,
     private _utilitiesService: UtilitiesService) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    this.getRooms('rooms')
  }


  getRooms(model: string){
    this.subs.add(this._datatableService.getPublicData(model).subscribe({
      next: (res: any)=>{
        this.rooms = res
      }
    }))
  }

  getCompleteUrl(url: string): string{
    if(!url) return ''
  
    const urls = url.split(':')
    if(urls.includes('http') || urls.includes('https')){
      return url
    }else{
      return this._utilitiesService.base_url_no_api + url
    }
  }

  getSafeContent(content: any){
    return this._sanitizer.bypassSecurityTrustHtml(content)
  }
}

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value: any) {
    //console.log(this.sanitized.bypassSecurityTrustHtml(value))
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}
