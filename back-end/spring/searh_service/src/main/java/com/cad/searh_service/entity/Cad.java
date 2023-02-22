package com.cad.searh_service.entity;

import jakarta.persistence.*;
import lombok.*;
import org.joda.time.DateTime;

import java.time.LocalDateTime;

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
    @Column(name = "imgUrl")
    private String imgUrl;
    @Column(name = "created")
    private LocalDateTime createdAt;
    @Column(name = "updated")
    private LocalDateTime updatedAt;
}
