package progi.project.eventovci.media.content.controller.dto;

public class MediaDTO {
    private String content;
    private String type;

    public MediaDTO(String content, String type) {
        this.content = content;
        this.type = type;
    }

    public MediaDTO(){}

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
