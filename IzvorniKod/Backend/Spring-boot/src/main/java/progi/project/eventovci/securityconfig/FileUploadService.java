package progi.project.eventovci.securityconfig;


import com.cloudinary.Cloudinary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class FileUploadService {

    private final Cloudinary cloudinary;

    // Constructor to inject Cloudinary bean
    public FileUploadService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadanje(MultipartFile file, Long ID) throws IOException {
        // Convert ID to String before passing it to Cloudinary
        String publicId = file.getOriginalFilename();

        if (publicId==null) {
            publicId = String.valueOf(Math.random());
        }

        return cloudinary.uploader()
                .upload(file.getBytes(), Map.of("public_id", publicId))
                .get("url")
                .toString();
    }

}