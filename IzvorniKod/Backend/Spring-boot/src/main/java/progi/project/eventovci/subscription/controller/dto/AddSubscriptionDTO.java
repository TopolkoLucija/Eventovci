package progi.project.eventovci.subscription.controller.dto;

import java.util.List;

public class AddSubscriptionDTO {
    private List<String> types;
    private List<String> locations;

    public AddSubscriptionDTO(List<String> types, List<String> locations) {
        this.types = types;
        this.locations = locations;
    }

    public AddSubscriptionDTO(){}

    public List<String> getTypes() {
        return types;
    }

    public void setTypes(List<String> types) {
        this.types = types;
    }

    public List<String> getLocations() {
        return locations;
    }

    public void setLocations(List<String> locations) {
        this.locations = locations;
    }
}
