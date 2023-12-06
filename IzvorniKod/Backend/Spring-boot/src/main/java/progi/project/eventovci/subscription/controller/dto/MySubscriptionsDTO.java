package progi.project.eventovci.subscription.controller.dto;

import java.util.List;

public class MySubscriptionsDTO {
    private String types;
    private String locations;

    public MySubscriptionsDTO(String types, String locations) {
        this.types = types;
        this.locations = locations;
    }

    public MySubscriptionsDTO() {}

    public String getTypes() {
        return types;
    }

    public void setTypes(String types) {
        this.types = types;
    }

    public String getLocations() {
        return locations;
    }

    public void setLocations(String locations) {
        this.locations = locations;
    }
}
