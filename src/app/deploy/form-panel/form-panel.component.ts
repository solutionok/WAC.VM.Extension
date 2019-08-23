import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataTableComponent, MasterViewComponent } from '@microsoft/windows-admin-center-sdk/angular';

@Component({
    selector: 'formPanel',
    templateUrl: './form-panel.component.html',
    styleUrls: ['./form-panel.component.css']
})

export class FormPanelComponent implements OnInit {
    @ViewChild('harddiskTable')
    private harddiskTable: DataTableComponent;

    @Input() public contentData: any
    @Input() public tabindex: any
    @Input() public vswitchdata: any
    
    public binaryFiles = {
        answer_file : null
    }

    // tslint:disable-next-line: no-empty
    constructor() {}

    public dolog(i) {
        console.log(i)
    }

    public attachFileChanged(formItem: any, files: FileList) {
        formItem.filename = files.item(0).name
        this.binaryFiles[formItem.id] = files.item(0);
    }

    public radioActived(formdata, item) {
        // tslint:disable-next-line: forin
        for (let i in formdata.formItems) {
            if (formdata.formItems[i]['type'] === 'radio' && item['name'] === formdata.formItems[i]['name']) {
                formdata.formItems[i].checked = false
            }
        }

        item.checked = true

        formdata.activeRadioName = item.followme ? item.followme : ''
    }
    public checkboxChanged(formdata, item) {
        item.checked = !!!(item.checked)
        if (item.followme) {

            formdata.activeRadioName = item.checked ? item.followme : ''
        }
    }

    public showAble(content, item) {
        if (item.follow && content.activeRadioName !== item.follow) {
            return false
        }

        return true;
    }

    public removeItemControl(lists, ind) {
        lists.splice(ind, 1)
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
