import { NamespaceActions } from './namespaceActions';
import { OrganizationRoles } from './organizationRoles';
export declare class OrganizationUser {
    'userId'?: string;
    'organizationId'?: string;
    'username'?: string;
    'organizationName'?: string;
    'role'?: OrganizationRoles;
    'allowedActions'?: Array<NamespaceActions>;
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
