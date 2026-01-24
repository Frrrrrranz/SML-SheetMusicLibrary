import { createClient } from '@supabase/supabase-js';

// NOTE: 这些值需要在环境变量中配置，这里使用占位符
// 实际部署时通过 Vite 环境变量注入
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * 上传 PDF 文件到 Supabase Storage
 * @param file 要上传的文件
 * @param workId 作品 ID（用于生成唯一文件名）
 * @returns 文件的公开 URL
 */
export const uploadSheetMusic = async (file: File, workId: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${workId}.${fileExt}`;
    const filePath = `sheets/${fileName}`;

    // DEBUG: 打印上传信息
    console.log('=== 上传调试信息 ===');
    console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('Anon Key 前20字符:', import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20));
    console.log('文件名:', file.name);
    console.log('文件大小:', file.size, 'bytes');
    console.log('文件类型:', file.type);
    console.log('存储路径:', filePath);
    console.log('存储桶:', 'sheet-music');

    const { data, error } = await supabase.storage
        .from('sheet-music')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true, // 覆盖同名文件
        });

    if (error) {
        // DEBUG: 打印详细错误
        console.error('=== 上传错误详情 ===');
        console.error('错误消息:', error.message);
        console.error('完整错误对象:', JSON.stringify(error, null, 2));
        throw new Error(`Failed to upload file: ${error.message}`);
    }

    console.log('上传成功:', data);

    // 获取公开 URL
    const { data: urlData } = supabase.storage
        .from('sheet-music')
        .getPublicUrl(filePath);

    return urlData.publicUrl;
};

/**
 * 删除 Supabase Storage 中的文件
 * @param fileUrl 文件 URL
 */
export const deleteSheetMusic = async (fileUrl: string): Promise<void> => {
    // 从 URL 提取文件路径
    const urlParts = fileUrl.split('/sheet-music/');
    if (urlParts.length < 2) return;

    const filePath = urlParts[1];

    const { error } = await supabase.storage
        .from('sheet-music')
        .remove([filePath]);

    if (error) {
        console.error('Failed to delete file:', error.message);
    }
};
