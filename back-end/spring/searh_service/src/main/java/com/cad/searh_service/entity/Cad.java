package com.cad.searh_service.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.TextScore;

@Data
@Builder
@Document(collection = "cad")
public class Cad {
    @Id
    private String id;
    private String author;
    private String mainCategory;
    private String subCategory;
    @TextScore
    private String title;
    private String index;
    private String s3Url;
    private String createdAt;
    private String updatedAt;
}
