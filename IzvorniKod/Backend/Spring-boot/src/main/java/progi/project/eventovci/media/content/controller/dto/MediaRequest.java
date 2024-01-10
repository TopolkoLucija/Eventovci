package progi.project.eventovci.media.content.controller.dto;

import org.springframework.web.multipart.MultipartFile;

public class MediaRequest {
    private MultipartFile file;
    private Long id;

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
