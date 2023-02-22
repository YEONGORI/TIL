package com.cad.searh_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Entity
public class Cad {
    @Id
    private String id;
    private String author;
    private String mainCategory;
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
