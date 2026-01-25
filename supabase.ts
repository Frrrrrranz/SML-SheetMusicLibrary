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

    const { data, error } = await supabase.storage
        .from('sheet-music')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true, // 覆盖同名文件
        });

    if (error) {
        console.error('上传失败:', error.message);
        throw new Error(`Failed to upload file: ${error.message}`);
    }

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

/**
 * 上传作曲家头像到 Supabase Storage
 * @param file 要上传的图片文件
 * @param composerId 作曲家 ID（用于生成唯一文件名）
 * @returns 图片的公开 URL
 */
export const uploadAvatar = async (file: File, composerId: string): Promise<string> => {
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = `${composerId}.${fileExt}`;
    const filePath = `composers/${fileName}`;

    const { error } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true, // 覆盖同名文件
        });

    if (error) {
        console.error('头像上传失败:', error.message);
        throw new Error(`Failed to upload avatar: ${error.message}`);
    }

    // 获取公开 URL
    const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

    return urlData.publicUrl;
};

/**
 * 删除作曲家头像
 * @param imageUrl 头像 URL
 */
export const deleteAvatar = async (imageUrl: string): Promise<void> => {
    // 只删除存储在 avatars bucket 中的图片，跳过外部 URL
    if (!imageUrl.includes('/avatars/')) return;

    const urlParts = imageUrl.split('/avatars/');
    if (urlParts.length < 2) return;

    const filePath = urlParts[1];

    const { error } = await supabase.storage
        .from('avatars')
        .remove([filePath]);

    if (error) {
        console.error('Failed to delete avatar:', error.message);
    }
};

/**
 * 上传录音文件到 Supabase Storage
 * @param file 要上传的音频文件
 * @param recordingId 录音记录 ID（用于生成唯一文件名）
 * @returns 文件的公开 URL
 */
export const uploadRecordingFile = async (file: File, recordingId: string): Promise<string> => {
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'mp3';
    const fileName = `${recordingId}.${fileExt}`;
    const filePath = `audio/${fileName}`;

    const { error } = await supabase.storage
        .from('recordings')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true, // 覆盖同名文件
        });

    if (error) {
        console.error('录音上传失败:', error.message);
        throw new Error(`Failed to upload recording: ${error.message}`);
    }

    // 获取公开 URL
    const { data: urlData } = supabase.storage
        .from('recordings')
        .getPublicUrl(filePath);

    return urlData.publicUrl;
};

/**
 * 删除录音文件
 * @param fileUrl 录音文件 URL
 */
export const deleteRecordingFile = async (fileUrl: string): Promise<void> => {
    // 只删除存储在 recordings bucket 中的文件，跳过外部 URL
    if (!fileUrl.includes('/recordings/')) return;

    const urlParts = fileUrl.split('/recordings/');
    if (urlParts.length < 2) return;

    const filePath = urlParts[1];

    const { error } = await supabase.storage
        .from('recordings')
        .remove([filePath]);

    if (error) {
        console.error('Failed to delete recording file:', error.message);
    }
};
