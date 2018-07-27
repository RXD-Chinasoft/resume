import { POST, POSTFORM } from './base'

export const GetRequirements = () => {
    return POST('/requirementCandidates');
}

export const CreateRequirement = (body) => {
    return POST('/requirement', body);
}

export const UpdateRequirement = (body) => {
    return POST('/requirementrenewal', body);
}

export const DeleteRequirement = (id) => {
    return POST('/requirementoff', { id })
}

// candidate
export const GetCandidates = () => {
    return POST('/candidates');
}

export const CreateCandidate = (body) => {
    return POST('/candidate', body);
}

export const CreateCandidateWithForm = (formData) => {
    return POSTFORM('/candidateform', formData);
}

export const UpdateCandidate = (body) => {
    return POST('/candidaterenewal', body);
}

export const DeleteCandidate = (id) => {
    return POST('/candidateoff', { id })
}

// dictionaries
export const GetDictionaries = () => {
    return POST('/dictionaries');
}




