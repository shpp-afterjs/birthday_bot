type TeamMemberKeys = 'name' | 'last_name' | 'username_GH' | 'photoId_GH' | 'username_TG' | 'email' | 'mission';

export type TeamMember = {
    [key in TeamMemberKeys]: string;
}

type TeamList = TeamMember[]

export default TeamList;
