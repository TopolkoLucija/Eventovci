package progi.project.eventovci.securityconfig;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileUploadService {
    public String uploadanje(MultipartFile file, Long ID) throws IOException {

        Path trenutniDirektorij = Paths.get(System.getProperty("user.dir"));
        Path relativnaPutanja = trenutniDirektorij.resolve("IzvorniKod/Backend/Spring-boot/src/main/resources");


        StringBuilder builder = new StringBuilder();
        builder.append(ID + "_");
        builder.append(file.getOriginalFilename());


        Path uploadPath = Paths.get(relativnaPutanja.toString(), builder.toString());

        Files.copy(file.getInputStream(), uploadPath);

        return builder.toString();
    }

}