package progi.project.eventovci.securityconfig;

import jakarta.annotation.PostConstruct;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import progi.project.eventovci.media.content.entity.MediaContent;
import progi.project.eventovci.media.content.repository.MediaContentRepository;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Base64;

@Component
public class AddMedia {

    @Autowired
    private MediaContentRepository mediaContentRepository;

    @PostConstruct
    public void add() throws IOException {

        //privremeno rješenje za dodavanje slika u bazu
        String s = "https://static.wikia.nocookie.net/magnificentbaddie/images/7/73/The_Grinch.png/revision/latest/scale-to-width-down/1200?cb=20210323121308";
        URL url = new URL(s);
        InputStream input = url.openStream();
        MultipartFile multipartFile = new MockMultipartFile("fileItem",
                "input", "image/png", IOUtils.toByteArray(input));

        String content = (Base64.getEncoder().encodeToString(multipartFile.getBytes()));

        s = "https://www.hollywoodreporter.com/wp-content/uploads/2014/09/elsa_frozen.jpg?w=1024";
        url = new URL(s);

        input = url.openStream();
        multipartFile = new MockMultipartFile("fileItem",
                "input", "image/png", IOUtils.toByteArray(input));

        String content1 = (Base64.getEncoder().encodeToString(multipartFile.getBytes()));

        mediaContentRepository.save(new MediaContent(content, "image", (long) 1.0));
        mediaContentRepository.save(new MediaContent(content1, "image", (long) 2.0));
        mediaContentRepository.save(new MediaContent(content, "image", (long) 3.0));
        mediaContentRepository.save(new MediaContent(content, "image", (long) 4.0));
        mediaContentRepository.save(new MediaContent(content, "image", (long) 5.0));
        mediaContentRepository.save(new MediaContent(content1, "image", (long) 6.0));
        mediaContentRepository.save(new MediaContent(content, "image", (long) 7.0));

        s = "https://www.youtube.com/watch?v=MvsAesQ-4zA";
        url = new URL(s);
        input = url.openStream();
        multipartFile = new MockMultipartFile("fileItem",
                "input", "video", IOUtils.toByteArray(input));

        content = (Base64.getEncoder().encodeToString(multipartFile.getBytes()));
        mediaContentRepository.save(new MediaContent(content, "video", (long) 3.0));
        mediaContentRepository.save(new MediaContent(content, "video", (long) 4.0));
    }
}
