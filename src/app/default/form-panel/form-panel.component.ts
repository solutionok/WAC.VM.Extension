import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'formPanel',
    templateUrl: './form-panel.component.html',
    styleUrls: ['./form-panel.component.css']
})
 
export class FormPanelComponent implements OnInit {
    @Input() public contentData: any
    @Input() public hddList: any
    @Input() public vnetList: any

    public selectedLibrary:any;
    public selectedVnet:any;

    public binaryFiles = {
        answer_file : null
    }

    // tslint:disable-next-line: no-empty
    constructor() {}

    public dolog(i) {
        console.log(i)
    }

    public selectedLibraryChanged(){
        
        for (let i=0; i<this.hddList.length; i++){
            if (this.selectedLibrary === this.hddList[i].id) {
                this.contentData.formItems[3].value = this.hddList[i].name;
            }
        }
    }

    public attachFileChanged(formItem: any, files: FileList) {
        formItem.filename = files.item(0).name
        this.binaryFiles[formItem.id] = files.item(0);
    }

    public radioActived(formdata, item) {
        if (!item.followme) {return;}
        // tslint:disable-next-line: forin
        for (let i in formdata.formItems) {
            if (formdata.formItems[i]['type'] === 'radio' && item['name'] === formdata.formItems[i]['name']) {
                formdata.formItems[i].checked = false
            }
        }

        item.checked = true

        formdata.activeRadioName = item.followme
    }

    public checkboxChanged(formdata, item) {
        item.checked = !!!(item.checked)
        if (item.followme) {
            formdata.activeRadioName = item.checked ? item.followme : ''
        }
    }

    public showAble(content, item) {
        if (item.follow && content.activeRadioName !== item.follow) {
            return false;
        }

        return true;
    }
    
    public createRunsOnec(lists) {
        lists.push({id: Date.now(), label: 'Item ' + (lists.length + 1)})
    }

    public removeItemControl(lists, iitem) {
        let ind = -1;

        for (let ii = 0; ii < lists.length; ii++){

            if (iitem.id === lists[ii].id) {

                ind = ii;    
            }
        }

        if(ind > -1) {
            lists.splice(ind, 1);
        }
    }

    public moveUpItemControl(lists, ind) {
        if (ind > 0) {
            let tmp = lists[ind - 1]
            lists[ind - 1] = lists[ind]
            lists[ind] = tmp
        }
    }

    public moveDownItemControl(lists, ind) {
        if ( lists.length - ind > 1 ) {
            let tmp = lists[ind + 1]
            lists[ind + 1] = lists[ind]
            lists[ind] = tmp
        }
    }

    // tslint:disable-next-line: no-empty
    public ngOnInit() {}

}
