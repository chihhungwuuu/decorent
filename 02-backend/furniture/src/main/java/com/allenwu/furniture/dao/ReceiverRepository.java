package com.allenwu.furniture.dao;

import com.allenwu.furniture.entity.Receiver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ReceiverRepository extends JpaRepository<Receiver,Long> {

}
