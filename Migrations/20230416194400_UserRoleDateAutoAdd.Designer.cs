﻿// <auto-generated />
using System;
using HydroFlowProject.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace HydroFlowProject.Migrations
{
    [DbContext(typeof(SqlServerDbContext))]
    [Migration("20230416194400_UserRoleDateAutoAdd")]
    partial class UserRoleDateAutoAdd
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("HydroFlowProject.Models.Basin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("BasinName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Description")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("Field")
                        .HasColumnType("int");

                    b.Property<double>("FlowObservationStationLat")
                        .HasColumnType("float");

                    b.Property<double>("FlowObservationStationLong")
                        .HasColumnType("float");

                    b.Property<string>("FlowStationNo")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("nvarchar(15)");

                    b.HasKey("Id")
                        .HasName("PK__Basins__3214EC071999E5DA");

                    b.ToTable("Basins");
                });

            modelBuilder.Entity("HydroFlowProject.Models.BasinModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("BasinId")
                        .HasColumnType("int");

                    b.Property<int>("ModelId")
                        .HasColumnType("int");

                    b.HasKey("Id")
                        .HasName("PK__Basin_Mo__3214EC076C7802A9");

                    b.HasIndex("BasinId");

                    b.HasIndex("ModelId");

                    b.ToTable("Basin_Models", (string)null);
                });

            modelBuilder.Entity("HydroFlowProject.Models.BasinPermission", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("BasinId")
                        .HasColumnType("int");

                    b.Property<bool?>("BasinPermissionType")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValueSql("((0))");

                    b.Property<bool?>("BasinSpecPerm")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValueSql("((0))");

                    b.Property<bool?>("UserSpecPerm")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValueSql("((0))");

                    b.HasKey("Id")
                        .HasName("PK__Basin_Pe__3214EC07AFBC4161");

                    b.HasIndex("BasinId");

                    b.ToTable("Basin_Permissions", (string)null);
                });

            modelBuilder.Entity("HydroFlowProject.Models.BasinUserPermission", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("BasinId")
                        .HasColumnType("int");

                    b.Property<bool?>("PermLat")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValueSql("((0))");

                    b.Property<bool?>("PermLong")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValueSql("((0))");

                    b.Property<bool?>("PermStationNo")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValueSql("((0))");

                    b.Property<int?>("PermUserId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id")
                        .HasName("PK__Basin_Us__3214EC079001A356");

                    b.HasIndex("BasinId");

                    b.HasIndex("UserId");

                    b.ToTable("Basin_User_Permissions", (string)null);
                });

            modelBuilder.Entity("HydroFlowProject.Models.Model", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("CreateDate")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2");

                    b.Property<byte[]>("ModelFile")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<int>("ModelPermissionId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id")
                        .HasName("PK__Models__3214EC077CF5FEB4");

                    b.ToTable("Models");
                });

            modelBuilder.Entity("HydroFlowProject.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("RoleDescription")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("RoleValue")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id")
                        .HasName("PK__Roles__3214EC0700EF73EB");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("HydroFlowProject.Models.Session", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<DateTime?>("SessionCreateDate")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<DateTime?>("SessionExpireDate")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP + 3");

                    b.Property<string>("SessionId")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("nvarchar(64)");

                    b.Property<bool>("SessionIsValid")
                        .HasColumnType("bit");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id")
                        .HasName("PK__Sessions__PrimaryKey");

                    b.HasIndex("UserId");

                    b.ToTable("Sessions");
                });

            modelBuilder.Entity("HydroFlowProject.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CorporationName")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(75)
                        .IsUnicode(false)
                        .HasColumnType("varchar(75)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<byte[]>("Password")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("varbinary(256)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id")
                        .HasName("PK__Users__3214EC0751F45BF6");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("HydroFlowProject.Models.UserModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ModelId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id")
                        .HasName("PK__User_Mod__3214EC07E1F8B074");

                    b.HasIndex("ModelId");

                    b.HasIndex("UserId");

                    b.ToTable("User_Models", (string)null);
                });

            modelBuilder.Entity("HydroFlowProject.Models.UserRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("UserRoleDate")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("datetime2");

                    b.HasKey("Id")
                        .HasName("PK__User_Rol__3214EC0729397F40");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("User_Roles", (string)null);
                });

            modelBuilder.Entity("HydroFlowProject.Models.UserUserPermission", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ModelId")
                        .HasColumnType("int");

                    b.Property<bool?>("PermData")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValueSql("((0))");

                    b.Property<bool?>("PermDownload")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValueSql("((0))");

                    b.Property<bool?>("PermSimulation")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValueSql("((0))");

                    b.Property<int>("PermittedUserId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id")
                        .HasName("PK__User_Use__3214EC07FB231915");

                    b.HasIndex("ModelId");

                    b.HasIndex("PermittedUserId");

                    b.HasIndex("UserId");

                    b.ToTable("User_UserPermission", (string)null);
                });

            modelBuilder.Entity("HydroFlowProject.Models.BasinModel", b =>
                {
                    b.HasOne("HydroFlowProject.Models.Basin", "Basin")
                        .WithMany("BasinModels")
                        .HasForeignKey("BasinId")
                        .IsRequired()
                        .HasConstraintName("FK_Basin_Models_BasinId");

                    b.HasOne("HydroFlowProject.Models.Model", "Model")
                        .WithMany("BasinModels")
                        .HasForeignKey("ModelId")
                        .IsRequired()
                        .HasConstraintName("FK_Basin_Models_ModelId");

                    b.Navigation("Basin");

                    b.Navigation("Model");
                });

            modelBuilder.Entity("HydroFlowProject.Models.BasinPermission", b =>
                {
                    b.HasOne("HydroFlowProject.Models.Basin", "Basin")
                        .WithMany("BasinPermissions")
                        .HasForeignKey("BasinId")
                        .IsRequired()
                        .HasConstraintName("FK_Basin_Permissions_BasinId");

                    b.Navigation("Basin");
                });

            modelBuilder.Entity("HydroFlowProject.Models.BasinUserPermission", b =>
                {
                    b.HasOne("HydroFlowProject.Models.Basin", "Basin")
                        .WithMany("BasinUserPermissions")
                        .HasForeignKey("BasinId")
                        .IsRequired()
                        .HasConstraintName("FK_Basin_User_Permissions_BasinId");

                    b.HasOne("HydroFlowProject.Models.User", "User")
                        .WithMany("BasinUserPermissions")
                        .HasForeignKey("UserId")
                        .IsRequired()
                        .HasConstraintName("FK_Basin_User_Permissions_UserId");

                    b.Navigation("Basin");

                    b.Navigation("User");
                });

            modelBuilder.Entity("HydroFlowProject.Models.Session", b =>
                {
                    b.HasOne("HydroFlowProject.Models.User", "User")
                        .WithMany("UserSessions")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientCascade)
                        .IsRequired()
                        .HasConstraintName("FK_User_Session");

                    b.Navigation("User");
                });

            modelBuilder.Entity("HydroFlowProject.Models.UserModel", b =>
                {
                    b.HasOne("HydroFlowProject.Models.Model", "Model")
                        .WithMany("UserModels")
                        .HasForeignKey("ModelId")
                        .IsRequired()
                        .HasConstraintName("FK_User_Models_ModelId");

                    b.HasOne("HydroFlowProject.Models.User", "User")
                        .WithMany("UserModels")
                        .HasForeignKey("UserId")
                        .IsRequired()
                        .HasConstraintName("FK_User_Models_UserId");

                    b.Navigation("Model");

                    b.Navigation("User");
                });

            modelBuilder.Entity("HydroFlowProject.Models.UserRole", b =>
                {
                    b.HasOne("HydroFlowProject.Models.Role", "Role")
                        .WithMany("UserRoles")
                        .HasForeignKey("RoleId")
                        .IsRequired()
                        .HasConstraintName("FK_User_Roles_RoleId");

                    b.HasOne("HydroFlowProject.Models.User", "User")
                        .WithMany("UserRoles")
                        .HasForeignKey("UserId")
                        .IsRequired()
                        .HasConstraintName("FK_User_Roles_UserId");

                    b.Navigation("Role");

                    b.Navigation("User");
                });

            modelBuilder.Entity("HydroFlowProject.Models.UserUserPermission", b =>
                {
                    b.HasOne("HydroFlowProject.Models.Model", "Model")
                        .WithMany("UserUserPermissions")
                        .HasForeignKey("ModelId")
                        .IsRequired()
                        .HasConstraintName("FK_User_UserPermission_ModelId");

                    b.HasOne("HydroFlowProject.Models.User", "PermittedUser")
                        .WithMany("UserUserPermissionPermittedUsers")
                        .HasForeignKey("PermittedUserId")
                        .IsRequired()
                        .HasConstraintName("FK_User_UserPermission_PermittedUserId");

                    b.HasOne("HydroFlowProject.Models.User", "User")
                        .WithMany("UserUserPermissionUsers")
                        .HasForeignKey("UserId")
                        .IsRequired()
                        .HasConstraintName("FK_User_UserPermission_UserId");

                    b.Navigation("Model");

                    b.Navigation("PermittedUser");

                    b.Navigation("User");
                });

            modelBuilder.Entity("HydroFlowProject.Models.Basin", b =>
                {
                    b.Navigation("BasinModels");

                    b.Navigation("BasinPermissions");

                    b.Navigation("BasinUserPermissions");
                });

            modelBuilder.Entity("HydroFlowProject.Models.Model", b =>
                {
                    b.Navigation("BasinModels");

                    b.Navigation("UserModels");

                    b.Navigation("UserUserPermissions");
                });

            modelBuilder.Entity("HydroFlowProject.Models.Role", b =>
                {
                    b.Navigation("UserRoles");
                });

            modelBuilder.Entity("HydroFlowProject.Models.User", b =>
                {
                    b.Navigation("BasinUserPermissions");

                    b.Navigation("UserModels");

                    b.Navigation("UserRoles");

                    b.Navigation("UserSessions");

                    b.Navigation("UserUserPermissionPermittedUsers");

                    b.Navigation("UserUserPermissionUsers");
                });
#pragma warning restore 612, 618
        }
    }
}
