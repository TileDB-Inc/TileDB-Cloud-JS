import { NamespaceActions } from './namespaceActions';
import { OrganizationRoles } from './organizationRoles';
import { OrganizationUser } from './organizationUser';
export declare class Organization {
    'id'?: string;
    'role'?: OrganizationRoles;
    'name': string;
    'createdAt'?: Date;
    'updatedAt'?: Date;
    'logo'?: string;
    'description'?: string;
    'users'?: Array<OrganizationUser>;
    'allowedActions'?: Array<NamespaceActions>;
    'numOfArrays'?: number;
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
