/**
 * 数据验证工具
 * 提供对原始数据的完整性检查
 */
import { FileInputData } from './FilenameInputPanelTS';

// 定义必需字段列表（不包含station）
const REQUIRED_FIELDS = [
  'dateInput',
  'day',
  'model',
  'month',
  'time',
  'year'
];

/**
 * 确保数据对象包含除 station 外的所有必要字段
 * @param data 需要验证的数据对象
 * @returns 包含验证结果和缺失字段的对象
 */
export function ensureRequiredFields(data: any): {
  isValid: boolean;
  missingFields: string[];
} {
  const missingFields = REQUIRED_FIELDS.filter(field => {
    // 检查字段是否存在
    if (!(field in data)) return true;
    
    // 获取字段值
    const value = data[field];
    
    // 检查值是否为 undefined 或 null
    if (value === undefined || value === null) return true;
    
    // 特殊字段验证
    switch (field) {
      case 'dateInput':
        // 验证日期格式 (YYYY-MM-DD)
        return !/^\d{4}-\d{2}-\d{2}$/.test(value);
      case 'day':
      case 'month':
      case 'year':
        // 验证数字类型
        return isNaN(Number(value));
      default:
        // 其他字段只需检查是否为空字符串
        return value === '';
    }
  });

  return {
    isValid: missingFields.length === 0,
    missingFields
  };
}

/**
 * 过滤无效数据项
 * @param data 原始数据数组
 * @returns 包含有效数据和无效数据的对象
 */
export function filterData(data: any[]): {
  validData: FileInputData[];
  invalidData: { item: any; missingFields: string[] }[];
} {
  const result = {
    validData: [] as FileInputData[],
    invalidData: [] as { item: any; missingFields: string[] }[]
  };

  data.forEach(item => {
    const { isValid, missingFields } = ensureRequiredFields(item);
    if (isValid) {
      result.validData.push(item as FileInputData);
    } else {
      result.invalidData.push({ item, missingFields });
    }
  });

  return result;
}    