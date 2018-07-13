import { POST } from './base'

export const GetRequirements = () => {
    POST('/requirements');
}

export const CreateRequirement = (body) => {
    POST('/requirement', body);
}

export const UpdateRequirement = (body) => {
    POST('/requirementrenewal', body);
}

export const DeleteRequirement = (id) => {
    POST('/requirementoff', { id })
}

// candidate
export const GetCandidates = () => {
    POST('/candidates');
}

export const CreateCandidate = (body) => {
    POST('/candidate', body);
}

export const UpdateCandidate = (body) => {
    POST('/candidaterenewal', body);
}

export const DeleteCandidate = (id) => {
    POST('/candidateoff', { id })
}




