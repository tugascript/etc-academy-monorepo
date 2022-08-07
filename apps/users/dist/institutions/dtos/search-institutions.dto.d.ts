import { CountryCodesEnum } from '../../addresses/enums/contry-codes.enum';
import { SearchDto } from '../../common/dtos';
import { InstitutionTypeEnum } from '../enums/institution-type.enum';
export declare abstract class SearchInstitutionsDto extends SearchDto {
    institutionType?: InstitutionTypeEnum;
    country?: CountryCodesEnum;
}
