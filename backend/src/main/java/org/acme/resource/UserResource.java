package org.acme.resource;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.validation.Valid;
import org.acme.entity.User;
import org.hibernate.exception.ConstraintViolationException;

import java.net.URI;
import java.util.List;

@Path("/api/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class UserResource {

    @GET
    public Response getAllUsers() {
        List<User> users = User.listAll();
        return Response.ok(users).build();
    }

    @GET
    @Path("/{id}")
    public Response getUserById(@PathParam("id") Long id) {
        return User.findByIdOptional(id)
                .map(user -> Response.ok(user).build())
                .orElse(Response.status(Response.Status.NOT_FOUND).build());
    }

    @POST
    @Transactional
    public Response createUser(@Valid User user) {
        try {
            // Check if user with same SSN exists
            if (User.find("socialSecurityNumber", user.getSocialSecurityNumber()).count() > 0) {
                return Response.status(Response.Status.CONFLICT)
                        .entity("A user with this SSN already exists")
                        .build();
            }

            // Check if user with same email exists
            if (User.find("email", user.getEmail()).count() > 0) {
                return Response.status(Response.Status.CONFLICT)
                        .entity("A user with this email already exists")
                        .build();
            }

            user.persist();
            return Response.created(URI.create("/api/users/" + user.getId())).build();
        } catch (Exception e) {
            if (e.getCause() instanceof ConstraintViolationException) {
                return Response.status(Response.Status.CONFLICT)
                        .entity("A user with these unique credentials already exists")
                        .build();
            }
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("An error occurred while creating the user")
                    .build();
        }
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response updateUser(@PathParam("id") Long id, @Valid User updatedUser) {
        try {
            User existingUser = User.findById(id);
            if (existingUser == null) {
                return Response.status(Response.Status.NOT_FOUND).build();
            }

            // Check if SSN is being changed and if it conflicts with another user
            if (!existingUser.getSocialSecurityNumber().equals(updatedUser.getSocialSecurityNumber()) &&
                User.find("socialSecurityNumber = ?1 and id != ?2", 
                         updatedUser.getSocialSecurityNumber(), id).count() > 0) {
                return Response.status(Response.Status.CONFLICT)
                        .entity("Another user with this SSN already exists")
                        .build();
            }

            // Check if email is being changed and if it conflicts with another user
            if (!existingUser.getEmail().equals(updatedUser.getEmail()) &&
                User.find("email = ?1 and id != ?2", 
                         updatedUser.getEmail(), id).count() > 0) {
                return Response.status(Response.Status.CONFLICT)
                        .entity("Another user with this email already exists")
                        .build();
            }

            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setMiddleName(updatedUser.getMiddleName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setDateOfBirth(updatedUser.getDateOfBirth());
            existingUser.setSocialSecurityNumber(updatedUser.getSocialSecurityNumber());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
            existingUser.setStreetAddress(updatedUser.getStreetAddress());
            existingUser.setCity(updatedUser.getCity());
            existingUser.setState(updatedUser.getState());
            existingUser.setZipCode(updatedUser.getZipCode());

            return Response.ok(existingUser).build();
        } catch (Exception e) {
            if (e.getCause() instanceof ConstraintViolationException) {
                return Response.status(Response.Status.CONFLICT)
                        .entity("Update would violate unique constraints")
                        .build();
            }
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("An error occurred while updating the user")
                    .build();
        }
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteUser(@PathParam("id") Long id) {
        User user = User.findById(id);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        user.delete();
        return Response.noContent().build();
    }

    @GET
    @Path("/search")
    public Response searchUsers(@QueryParam("query") String email) {
        if (email == null || email.trim().isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Email query parameter is required")
                    .build();
        }

        String searchPattern = "%" + email.trim().toLowerCase() + "%";
        List<User> users = User.list("LOWER(email) LIKE ?1", searchPattern);
        return Response.ok(users).build();
    }

    @GET
    @Path("/{id}/accounts")
    public Response getUserAccounts(@PathParam("id") Long id) {
        User user = User.findById(id);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("User not found")
                    .build();
        }
        return Response.ok(user.getBankAccounts()).build();
    }
}