import { Proposal, UpdateRequest, NewProposalData, NewPerspectiveData } from "../uprtcl/types"
import { ProposalsRepository } from "./proposals.repository";

export class ProposalsService {

    constructor(
        protected proposalRepo: ProposalsRepository) {    
    }

    async createProposal(proposalData: NewProposalData, loggedUserId: string | null): Promise<string> {
        if (loggedUserId === null) throw new Error('Anonymous user. Cant create a proposal');
                
        return await this.proposalRepo.createOrUpdateProposal(proposalData);
    };

    async createAndPropose(newPerspectivesData: NewPerspectiveData[], loggedUserId: string | null): Promise<string> {            
        if (loggedUserId === null) throw new Error('Anonymous user. Cant create a perspective');

        if(newPerspectivesData.length > 2) throw new Error('A proposal can not have more that two (2) perspectives. `From` and `To` are needed.');        

        return await this.proposalRepo.createAndPropose(newPerspectivesData, loggedUserId);
    } 

    async getProposal(proposalId: string): Promise<Proposal> {
        if(proposalId == undefined || proposalId == '') {
            throw new Error(`proposalId is empty`);
        }

        const proposal = await this.proposalRepo.getProposal(proposalId);

        return proposal;
    };

    async getProposalsToPerspective(perspectiveId: string): Promise<Array<Proposal>> {
        if(perspectiveId == undefined || perspectiveId == '') {
            throw new Error(`perspectiveId is empty`);
        }

        const proposals = await this.proposalRepo.getProposalsToPerspective(perspectiveId);

        return proposals;
    };

    async addUpdatesToProposal(proposalId: string, updates: UpdateRequest[], loggedUserId: string | null): Promise<void> {
        if (loggedUserId === null) throw new Error('Anonymous user. Cant update a proposal');
        // TODO: Call createOrUpdate from repository.
        return;
    }

    async acceptProposal(proposalId: string, loggedUserId: string | null): Promise<void> {
        if (loggedUserId === null) throw new Error('Anonymous user. Cant accept a proposal');        

        return await this.proposalRepo.acceptProposal(proposalId);
    };

    async cancelProposal(proposalId: string, loggedUserId: string | null): Promise<void> {
        if (loggedUserId === null) throw new Error('Anonymous user. Cant cancel a proposal');
                
        return await this.proposalRepo.cancelProposal(proposalId);;
    };

    async declineProposal(proposalId: string, loggedUserId: string | null): Promise<void> {
        if (loggedUserId === null) throw new Error('Anonymous user. Cant decline a proposal');

        return await this.proposalRepo.acceptProposal(proposalId);;
    };
}