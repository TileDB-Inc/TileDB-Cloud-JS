import { NamespaceActions } from './namespaceActions';
import { OrganizationUser } from './organizationUser';
export declare class User {
    'id'?: string;
    'username': string;
    'password'?: string;
    'name'?: string;
    'email'?: string;
    'isValidEmail'?: boolean;
    'logo'?: string;
    'lastActivityDate'?: Date;
    'timezone'?: string;
    'organizations'?: Array<OrganizationUser>;
    'allowedActions'?: Array<NamespaceActions>;
    'enabledFeatures'?: Array<string>;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
