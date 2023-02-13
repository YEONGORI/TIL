package com.cad.searh_service.entity;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Entity
public class Cad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String author;
    @Column(name = "maincategory")
    private String mainCategory;
    @Column(name = "subcategory")
    private String subCategory;
    private String title;
    private String index;
    @Column(name = "s3url")
    private String s3Url;
    @Column(name = "created")
    private String createdAt;
    @Column(name = "updated")
    private String updatedAt;
}
