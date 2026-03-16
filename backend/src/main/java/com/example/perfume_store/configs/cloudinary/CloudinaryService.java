package com.example.perfume_store.configs.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@AllArgsConstructor
public class CloudinaryService {

    private Cloudinary cloudinary;

    public String uploadFile(MultipartFile file, String folderName) {
        try {
            Map params = ObjectUtils.asMap(
                    "folder", folderName,
                    "resource_type", "auto",
                    "transformation", new Transformation()
                            .width(800)
                            .height(800)
                            .crop("limit")           // Resize image automatically
                            .quality("auto")         // Compress the quality
                            .fetchFormat("auto")     // Choose the format compatible with client's browser
            );

            Map<?, ?> uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    params
            );

            return uploadResult.get("url").toString(); // Return image link after uploaded
        } catch (IOException e) {
            throw new RuntimeException("Upload to Cloudinary failed", e);
        }
    }

    public void deleteFile(String publicId) {
        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (IOException e) {
            throw new RuntimeException("Delete from Cloudinary failed", e);
        }
    }

    public void deleteFileByUrl(String url) {
        try {
            // .../perfumes/abcxyz123.jpg -> "perfumes/abcxyz123"
            String publicId = url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("."));
            // Nếu bạn để ảnh trong folder 'perfumes', public_id cần bao gồm cả tên folder
            String folder = "perfumes/";

            cloudinary.uploader().destroy(folder + publicId, ObjectUtils.emptyMap());
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete image from Cloudinary", e);
        }
    }
}