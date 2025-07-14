package org.example.backend.service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.example.backend.entity.LeadContacto;
import org.example.backend.repository.LeadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
public class LeadContactoImp implements LeadService {

    LeadRepository leadRepository;

    @Autowired
    public LeadContactoImp(LeadRepository leadRepository){
        this.leadRepository= leadRepository;
    }

    @Override
    public List<LeadContacto> findAll() {
        return leadRepository.findAll();
    }

    @Override
    public Optional<LeadContacto> findById(Integer lead_id) {
        Optional<LeadContacto> lead = null;
        lead = leadRepository.findById(lead_id);
        return lead;
    }

    @Override
    public void save(LeadContacto leadContacto) {
        leadRepository.save(leadContacto);
    }

    @Override
    public void importarLeadsDesdeExcel(InputStream inputStream) throws Exception {
        try (Workbook workbook = new XSSFWorkbook(inputStream)) {
            Sheet sheet = workbook.getSheetAt(0);

            List<LeadContacto> leads = new ArrayList<>();

            Iterator<Row> rows = sheet.iterator();
            boolean primeraFila = true;


            while (rows.hasNext()) {
                Row currentRow = rows.next();

                if (primeraFila) {
                    primeraFila = false;
                    continue;
                }

                LeadContacto lead = new LeadContacto();

                Cell celularCell = currentRow.getCell(0);
                Cell fechaCell = currentRow.getCell(1);
                Cell estadoCell = currentRow.getCell(2);
                Cell celularAltCell = currentRow.getCell(3); // Celular alterno


                if (celularCell != null) {
                    lead.setCelular(celularCell.getStringCellValue());
                }

                if (fechaCell != null) {
                    if (fechaCell.getCellType() == CellType.NUMERIC && DateUtil.isCellDateFormatted(fechaCell)) {
                        Instant fechaInstant = fechaCell.getDateCellValue().toInstant();
                        lead.setFecha(fechaInstant);
                    } else if (fechaCell.getCellType() == CellType.STRING) {
                        String fechaStr = fechaCell.getStringCellValue();
                        lead.setFecha(Instant.parse(fechaStr));
                    }
                }

                if (estadoCell != null) {
                    lead.setEstado(estadoCell.getStringCellValue());
                } else {
                    lead.setEstado("nuevo");
                }

                if (celularAltCell != null) {
                    lead.setCelularAlt(celularAltCell.getStringCellValue());
                }

                leads.add(lead);
            }

            leadRepository.saveAll(leads);
            System.out.println("Se recibió archivo para importar leads.");
        }
    }
}
