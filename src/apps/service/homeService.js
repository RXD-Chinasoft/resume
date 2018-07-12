import POST from './base'
import PUT from './base'
import DELETE from './base'
import { url } from 'inspector';

export const HomeService;

getRequirementList = (apiString, body) => {
    this.HomeService.POST(apiString, body);
}

putRequirementListToServe = (apiString, body) => {
    this.HomeService.PUT(apiString, body);
}

deleteRequirementList = (apiString, body) => {
    this.HomeService.DELETE(apiString, body)
}


