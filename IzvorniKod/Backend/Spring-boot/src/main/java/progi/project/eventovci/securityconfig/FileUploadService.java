package progi.project.eventovci.securityconfig;


import com.cloudinary.Cloudinary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Objects;

@Service
public class FileUploadService {

    private final Cloudinary cloudinary;

    // Constructor to inject Cloudinary bean
    public FileUploadService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadanje(MultipartFile file, Long ID, String type) throws IOException {
        // Convert ID to String before passing it to Cloudinary
        String publicId = file.getOriginalFilename();

        if (publicId == null) {
            publicId = String.valueOf(Math.random());
        }

        Map<String, Object> options = new java.util.HashMap<>(Map.of("public_id", publicId));

        if (Objects.equals(type, "image")) {
            return cloudinary.uploader().upload(file.getBytes(), options).get("url").toString();
        } else if (Objects.equals(type, "video")) {
            options.put("resource_type", "video");
            return cloudinary.uploader().uploadLarge(file.getBytes(), options).get("url").toString();
        } else {
            // Handle other file types or throw an error
            throw new RuntimeException("Unsupported file type");
        }
    }

}