package progi.project.eventovci.securityconfig;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.HashMap;
import java.util.Map;
@Configuration
public class CloudinaryConfig {
    private final String CLOUD_NAME = "dxwryg36j";
    private final String API_KEY = "956418542372421";
    private final String API_SECRET = "XTW-v0XOr_7O5QX1jQfk50OTd9w";
    @Bean
    public Cloudinary cloudinary(){
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name",CLOUD_NAME);
        config.put("api_key",API_KEY);
        config.put("api_secret",API_SECRET);
        return new Cloudinary(config);
    }
}
