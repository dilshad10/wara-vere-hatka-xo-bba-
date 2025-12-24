
export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
  PREFER_NOT_TO_SAY = 'Prefer not to say'
}

export enum ChatType {
  GLOBAL = 'Global',
  NEARBY = 'Nearby',
  GENDER_MATCH = 'Gender Match'
}

export interface Message {
  id: string;
  senderId: 'me' | 'stranger';
  text?: string;
  imageUrl?: string;
  isViewOnce?: boolean;
  hasBeenViewed?: boolean;
  timestamp: number;
}

export interface UserPreferences {
  gender: Gender;
  lookingFor: Gender | 'Any';
  chatType: ChatType;
}
